# URL SHORTENER API

This application allows you to shorten long URLs and provides an option for a custom URL path.

## How to Use:

**Original URL** (Required): The URL you want to shorten.

**Custom URL Path** (Optional): A specific path for the short URL (e.g., `my-custom-url`).

### Request Format:

Send a `POST` request to `/shorten`:

    POST /shorten
    {
        "original_url": "https://www.example.com",
        "custom_url_path": "my-custom-url" // Optional
    }

### Response:

You will receive the shortened URL. If no `custom_url_path` is provided, a random path consisting of 4 characters will be generated.

**Example Shortened URL:**

    example.com/my-custom-url
