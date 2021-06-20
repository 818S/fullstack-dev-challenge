import React from 'react'

type ErrorState = {
    hasError: boolean
    errorMessage: string
}

class ErrorBoundary extends React.Component<any, ErrorState> {
    constructor(props: any) {
        super(props)
        this.state = { hasError: false, errorMessage: '' }
    }

    static getDerivedStateFromError(error: { message: string }) {
        // Update state so the next render will show the fallback UI
        return { hasError: true, errorMessage: error.message }
    }

    render() {
        if (this.state.hasError) {
            // Render Fallback UI with the error message
            return (
                <>
                    <h1>Something went wrong 😔</h1>
                    <h3>Error: {this.state.errorMessage}</h3>
                    <h3>Try reloading the page.</h3>
                </>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary
