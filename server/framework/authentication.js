


class BaseAuthentication {
    /*
     * All authentication classes should extend BaseAuthentication.
     */

    authenticate(request) {
        /*
         * Authenticate the request and return a two-tuple of (user, token).
         */
        throw new Error('.authenticate() must be overridden.');
    }

    authenticateHeader(request) {
        /*
         * Return a string to be used as the value of the `WWW-Authenticate`
         * header in a `401 Unauthenticated` response, or `null` if the
         * authentication scheme should return `403 Permission Denied` responses.
         */
        return null;
    }
}
