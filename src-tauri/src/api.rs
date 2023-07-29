use reqwest::header::{HeaderMap, HeaderValue, AUTHORIZATION};

use crate::error::TauriError;
use crate::models::Url;

pub type ApiResult<T, E = TauriError> = Result<T, E>;

fn construct_headers(token: &str) -> HeaderMap {
    let mut headers = HeaderMap::new();
    let token = format!("Basic {}", token);
    let authorization_header = HeaderValue::from_str(&token).expect("Invalid access token");
    headers.insert(AUTHORIZATION, authorization_header);

    headers
}

pub async fn get_request(url: Url, token: &str) -> ApiResult<String> {
    let url = url.value();
    let client = reqwest::Client::new();
    let mut request_builder = client.get(url);
    request_builder = request_builder.headers(construct_headers(token));

    let response = request_builder
        .send()
        .await?
        .text()
        .await?;

    Ok(response)
}

pub fn parse_json<T: serde::de::DeserializeOwned>(data: &str) -> Result<T, TauriError> {
    serde_json::from_str(data).map_err(|error| TauriError {
        message: format!("Failed to parse the JSON response: {}", error),
    })
}
