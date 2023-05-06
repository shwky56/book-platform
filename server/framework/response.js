import express from 'express';

class Express4Response {
    constructor(data = null, status = null, template_name = null, headers = null, exception = false, content_type = null) {
        this.data = data;
        this.status = status;
        this.template_name = template_name;
        this.headers = headers;
        this.exception = exception;
        this.content_type = content_type;
        this.render()
    }

    render() {
        // Set the status code
        if (this.status) {
            res.status(this.status);
        }

        // Set the headers
        if (this.headers) {
            for (const [key, value] of Object.entries(this.headers)) {
                res.setHeader(key, value);
            }
        }

        // Set the content type
        if (this.content_type) {
            res.type(this.content_type);
        }

        // Render the data
        if (this.data) {
            if (this.content_type === 'application/json') {
                res.json(this.data);
            } else if (this.content_type === 'text/html') {
                // Render the HTML template
                if (this.template_name) {
                    res.render(this.template_name, this.data);
                } else {
                    res.send(this.data);
                }
            } else {
                res.send(this.data);
            }
        } else {
            res.end();
        }
        return res;
    }
}

// o    
export default Express4Response;
