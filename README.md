
<p align="center">
   <img src="https://user-images.githubusercontent.com/76220810/122701221-a7d07e00-d244-11eb-9c4e-cc63fc85a992.gif">
</p>


<p align="center">
    <img height="400px" src="https://user-images.githubusercontent.com/76220810/122697378-1e697d80-d23d-11eb-8cba-f666bc3788aa.png">
    <img height="400px" src="https://user-images.githubusercontent.com/76220810/122697383-20cbd780-d23d-11eb-8be0-04e0237bc2a3.png">
</p>

<br/>


# Finimize Full-Stack Development Challenge
  
**The Approach**

From reading the README, I figured that we needed to build a compound interest calculator. To get a better idea of how that would look and get some inspiration, I searched for a finance calculator on Dribbble - an designer community which I’m also a part of ([https://dribbble.com/HR](https://dribbble.com/HR)) and regularly use to get inspired by the latest design trends. I got quite inspired by these [https://dribbble.com/shots/12001805/attachments/3630442](https://dribbble.com/shots/12001805/attachments/3630442)   [https://dribbble.com/shots/14960986-Finice-loan/attachments/6679195](https://dribbble.com/shots/14960986-Finice-loan/attachments/6679195), and decided to incorporate some of their parts in my sketch of the design. In addition to the expected total savings amount and its series, I also decided to also calculate the total return (total made - contributions) and return on investment (ROI) to enhance the user experience (UX).

Once I had the basic UI sketch down, I started to break it up into a component hierarchy. Guided by the single-responsibility principle, I decomposed the bigger components into smaller ones until they did only one thing. This is the component hierarchy I came up with:



*   App
    *   Heading
    *   LineChart
    *   StatPanel (the results of the calculation)
        *   StatCard
    *   ParamsPanel (the inputs for the params: initial savings amount, monthly deposit and interest rate)
        *   NumberInputSlider
            *   Heading
            *   Slider
            *   NumberInput

For greater clarity, I first built a static version of the app that just rendered our data model via the props. I went top-down as the project was small so it was easier to do that but, for a larger project, I would go bottom-up and write tests as I build it.

To make the UI interactive, I first identified the most minimal set of data that had to change and then added them to the app’s react state:



*   The savings over time (yAxis)
*   The stats: expected total savings, total return and return on investment
*   The calculation params: initial savings amount, monthly deposit and interest rate. Also the values for the NumberInputSliders

Since react is all about one-way data flow down the component hierarchy and recommends ‘Lifting State Up’ ([https://reactjs.org/docs/lifting-state-up.html](https://reactjs.org/docs/lifting-state-up.html)), I decided that the best place for the app state to reside was the root App component. So for components like NumberInput and Slider, the value is passed down as a prop through the hierarchy and changes to the value are also made higher up. Having coded the design, I actually came up with 2 design variations:

`Design 1`:

![design 1](https://user-images.githubusercontent.com/76220810/122697206-bd41aa00-d23c-11eb-8027-a0ae5d60e29f.png)

`Design 2`:

![design 2](https://user-images.githubusercontent.com/76220810/122697211-c03c9a80-d23c-11eb-8d74-bd98a326b8c0.png)

I got some feedback from some potential users (my friends) and they unanimously agreed that `Design 1` was better so I went with that :)

Now, I was ready to call the API endpoint with the params and render the result in the UI. 

I started implementing the RESTful API by creating a well-organised folder structure which made a distinction between things like routes and controllers. I versioned the API starting from v1 at the path /api/v1 to honor contracts with our current API clients (especially our mobile app) in the future when we have breaking changes, as per best practices. All responses are in JSON and follow a standard format defined in IResponse. This ensures that the client can always handle the response. We respond to all unregistered routes requests with 404 Not Found. The compound interest calculation API is set up as a POST request (as we’re sending the params to the server) at the endpoint /api/v1/calculations/compound-interest. The formula listed on Wikipedia didn’t quite work for me but I managed to find the complete one here [https://www.thecalculatorsite.com/articles/finance/compound-interest-formula.php](https://www.thecalculatorsite.com/articles/finance/compound-interest-formula.php). To verify that my results were correct, I checked them against [https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator](https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator) and they matched. The actual calculation logic has been decoupled from the controller and put into the Calculator service along with the other calculations done so they can be tested independently. It throws a custom APIError with an appropriate error message for things like the interest rate being zero (leads to a division by zero). I’ve used Ajv ([https://ajv.js.org](https://ajv.js.org)) to enable us to robustly validate requests to any endpoint simply by defining a Ajv schema (like schemas/CompoundInterestRequest.ts) for it using my custom middleware (middlewares/validate.ts). Invalid requests are responded to with a 400 Bad Request code with an appropriate error message which is shown to the user at the client side. Unhandled errors are also globally caught by the errorHandler middleware at the end where they can also be passed to an error reporter (e.g. Sentry). I’ve used mocha with supertest and the chai assertion library to write test cases for unregistered routes and the compound interest API which cover a lot of edge cases with proper server setup and teardown (see src/__tests__).

![Screenshot 2021-06-20 at 18 43 18](https://user-images.githubusercontent.com/76220810/122701707-bb301900-d245-11eb-841d-27ac1bfc6bbb.png)


Once the backend was done, I wrote an API client (CompoundInterestAPI) on the client-side to make the call with the params when the inputs changed and render the response. The requirement was to trigger this call as soon as an onChange event on the input was triggered but, in the case of the slider, this was too frequent and inefficient. So to optimise, I decided to only trigger the call on the slider’s “onChangeEnd” event, when the user was done dragging the slider. However, the "onChangeEnd" event of the slider was being erroneously fired for multiple sliders despite interacting with only one slider at a time. After some debugging and digging around, I found that this was due to a bug in our chakra version (see https://github.com/chakra-ui/chakra-ui/issues/3522 and [https://github.com/chakra-ui/chakra-ui/pull/3836](https://github.com/chakra-ui/chakra-ui/pull/3836)). I upgraded @chakra-ui/react and its peer dependency framer-motion to the latest versions. To enhance the UX, I also decided to show an error message to the user via a toast like when the API call returns an error. There’s also an Error Boundary that wraps the App to catch any unhandled errors and displays a simple fallback UI which shows the error message for when things go really wrong.

To test the client-side, I wrote tests for the entire App and a component. For the App tests (client/src/__tests__/App.test.tsx), I used Mock Service Worker ([https://mswjs.io](https://mswjs.io)) with jest and the testing-library to mock our server including the compound interest calculation API. So the tests do test the App with the server results loaded. I had to upgrade the @testing-library/react to 12.0.0-alpha.2 due to the library’s compatibility issue with our latest jest version (5.14.1) which threw an “ReferenceError: You are trying to access a property or method of the Jest environment after it has been torn down.” error when my debugging showed no such issue and, instead, I found that a report for this issue had already been filed here [https://github.com/testing-library/react-testing-library/issues/918](https://github.com/testing-library/react-testing-library/issues/918). This issue was fixed in version 12.0.0-alpha.2.

![Screenshot 2021-06-20 at 18 46 23](https://user-images.githubusercontent.com/76220810/122701759-d569f700-d245-11eb-903e-7bf8e6a9a5ab.png)


**The Good**

I like the UI and UX, it’s simple, responsive and clean :)

I think that the code is pretty well-organised, well-modularised, robust and clearly-written. I’ve aimed to make the project structure pretty self-explanatory, using conventions where possible. Components and code have been broken up into modular parts. There’s good error handling. Comments (including JSDoc comments) have been used quite extensively to ensure that another team member can easily work with the code.

**The Could Be Better**

I think that the testing, especially on the frontend, could be improved. Currently, they do not test the slider or number input directly so more testing is required. Also, every component should be tested independently. So given the opportunity, I would test more comprehensively.

I also think that we should add another very useful feature: selecting the investment period. We could do this by adding another number input that allows the user to enter the time period in years and then get the calculated compound interest for the period and render it. On the server-side, I’ve already exposed the ‘time’ parameter (see CompoundInterestRequest.ts) so we just need to send the time period input value along with the other params to get the result :)

I’ve also added some `TODO` comments for future improvements that I’d make :)

## Run Instructions

To run the app, `cd` into the project root directory and run `yarn install` & `yarn start`
(install Yarn [here](https://yarnpkg.com/en/docs/install)).

Depending on your environment, you might need to install concurrently / Typescript globally.

There is one basic test written in the client, which you can run by performing
`cd client` and then `yarn test`. If you want to add new client tests you can use Jest.

Mocha has been installed on the server to allow you to create server tests if you wish,
although none have been written yet.

## The challenge

Create a web-app that shows how much you can expect to make from your savings over time.

The app must satisfy the following Acceptance Criteria (ACs):

* It should allow the user to vary the initial savings amount, monthly deposit and interest rate through the UI
* It should display how much the user's initial savings amount will be worth over the next 50 years. This should assume that the monthly amount is paid in each month, and the value rises with the interest rate supplied. There are resources online about calculating compound interest totals - e.g. [Wikipedia](https://en.wikipedia.org/wiki/Compound_interest#Investing:_monthly_deposits)
* All calculations must take place server-side, and all monthly projection data should be returned via an endpoint
* The calculations must be triggered onChange of any input, to give live feedback on the input data. The performance (try the slider) should be reasonable.

Since we are currently looking for someone to push up the standard of our product/UX - please spend some time making improvements in this regard. This doesn't have to be anything too flashy - just any opportunities you can see to make the product cleaner/more engaging/slicker.

### Our Guidance

The challenge should not take any more than 2-4 hours. You do not need to complete the challenge in one go.

These are some qualities we value:
 * Well-modularised, robust and clearly-written code
 * Maintainability. Another team member should be able to easily work with your code after you've finished. 
 * Single Responsibility Principle
 * A well-organised codebase. You should think about how your codebase might grow as the project becomes more complex

The UI has been started, as well as an example endpoint on the server. How you connect these and structure logic is up to you! Feel free to make changes to any of the code provided (including the UI) if you wish.

We have chosen to include a basic design system on the client, to give you an idea of how we like to build UIs. For this challenge we have used [Chakra JS](https://chakra-ui.com/docs/getting-started). If you're not familiar with such systems, hopefully this won't be too steep a learning curve. The docs will give you details of all the components/props you can use, but as a head-start, you can pass in styling props to the components including margins/padding etc like this:

```
// This produces a Box (styled div) with a top margin of 2, padding of 3 and a black background colour.
// Colours and spacing properties are defined in `themes/index.tsx`
<Box mt={2} p={3} bg='black'>
```

Although the API might be relatively straightforward, please try and write the API code as if you were building something more complex. We would like to gain an idea of how you would go about structuring API code.

Other than that, feel free to take the challenge in any directions you feel best showcase your strengths!

**Once complete**, please drop us a brief note (either an email, or in the readme somewhere) explaining:
* How you approached the challenge
* What bits of your solution you like
* What bits of your solution you’d like to improve upon

Any images/gifs of the finished product would be helpful too!

### Tooling

The frontend contains some tooling you might be familiar with

#### Typescript

If you like to use Typescript in your workflow, you should get any client warnings/errors appear in your terminal after running `yarn start`.

You can also run the server types using `yarn types`.

We believe strong TS typing will make your code much more robust.

#### Prettier

We believe Prettier makes your life easier! There is an example .prettierrc included in the `frontend` directory - feel free to tweak the settings if you'd prefer.

You might need to give your IDE a nudge to pick the settings up - [here's an example](https://stackoverflow.com/a/58669550/4388938) of how to do that with VS Code

