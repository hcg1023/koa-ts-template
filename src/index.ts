#!/usr/bin/env node

/**
 * Module dependencies.
 */
import * as http from 'http'
import app from './app'
import config from './config'

/**
 * Get port from environment and store in Koa.
 */

const port = normalizePort(process.env.PORT || config.port)
// app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app.callback())

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)
/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: string | number): string | number | false {
	const port = typeof val === 'number' ? val : parseInt(val, 10)

	if (isNaN(port)) {
		// named pipe
		return val
	}

	if (port >= 0) {
		// port number
		return port
	}

	return false
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: { syscall: string; code: string }): void {
	if (error.syscall !== 'listen') {
		throw error
	}

	const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

	// handle specific listen errors with friendly messages
	switch (error.code) {
		case 'EACCES':
			console.error(bind + ' requires elevated privileges')
			process.exit(1)
			break
		case 'EADDRINUSE':
			console.error(bind + ' is already in use')
			process.exit(1)
			break
		default:
			throw error
	}
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening(): void {
	const addr = server.address()
	const bind = typeof addr === 'string' ? 'pipe http://localhost:' + addr : 'port http://localhost:' + addr.port
	console.log('Listening on ' + bind)
}
