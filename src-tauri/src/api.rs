use anyhow::Result;
use reqwest::header::{HeaderMap, HeaderValue, AUTHORIZATION};

use crate::models::Url;

fn construct_headers(token: &str) -> HeaderMap {
    let mut headers = HeaderMap::new();
    let token = format!("Basic {}", token);
    let authorization_header = HeaderValue::from_str(&token).expect("Invalid access token");
    headers.insert(AUTHORIZATION, authorization_header);

    headers
}

pub async fn get_request(url: Url, token: &str) -> Result<String> {
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
