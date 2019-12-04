/**
 * Error that should be thrown when the specified entity can't be
 * found in the database
 */
class NotFoundError extends Error {}

module.exports = NotFoundError;
