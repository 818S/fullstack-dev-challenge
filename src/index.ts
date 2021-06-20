import app from './server'

/**
 * Starting the server
 * @param port Port at which server will run
 */
const server = app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}`) // eslint-disable-line no-console
})

/**
 * Exporting server instance
 */
export default server
