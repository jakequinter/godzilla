use reqwest::header::{HeaderMap, HeaderValue, AUTHORIZATION, CONTENT_TYPE};

use crate::error::TauriError;
use crate::models::url::Url;
use reqwest::StatusCode;

pub type ApiResult<T, E = TauriError> = Result<T, E>;

fn construct_headers(token: &str) -> HeaderMap {
    let mut headers = HeaderMap::new();
    let token = format!("Basic {}", token);
    let authorization_header = HeaderValue::from_str(&token).expect("Invalid access token");
    headers.insert(AUTHORIZATION, authorization_header);
    // add content type header
    headers.insert(CONTENT_TYPE, HeaderValue::from_static("application/json"));

    headers
}

pub async fn get_request(url: Url, token: &str) -> ApiResult<String> {
    let url = url.value();
    let client = reqwest::Client::new();
    let mut request_builder = client.get(url);
    request_builder = request_builder.headers(construct_headers(token));

    let response = request_builder.send().await?.text().await?;

    Ok(response)
}

pub fn parse_json<T: serde::de::DeserializeOwned>(data: &str) -> Result<T, TauriError> {
    serde_json::from_str(data).map_err(|error| TauriError {
        message: format!("Failed to parse the JSON response: {}", error),
    })
}

pub async fn post_request(url: Url, token: &str, body: String) -> ApiResult<(StatusCode, String)> {
    let url = url.value();
    let client = reqwest::Client::new();
    let mut request_builder = client.post(url);
    request_builder = request_builder.headers(construct_headers(token));
    request_builder = request_builder.body(body.to_string());

    let response = request_builder.send().await?;
    let status = response.status();
    let data = response.text().await?;

    Ok((status, data))
}
