use reqwest::header::{HeaderMap, HeaderValue, AUTHORIZATION};

use crate::models::{ApiResult, Url};

fn construct_headers(token: &str) -> HeaderMap {
    let mut headers = HeaderMap::new();
    let token = format!("Basic {}", token);
    let authorization_header = HeaderValue::from_str(&token).expect("Invalid access token");
    headers.insert(AUTHORIZATION, authorization_header);

    headers
}

pub fn get_request(url: Url, token: &str) -> ApiResult<String> {
    let url = url.value();
    let client = reqwest::blocking::Client::new();
    let response = client.get(url).headers(construct_headers(token)).send()?;

    let response_body = response.text()?;

    Ok(response_body)
}

pub fn post_request(url: Url, token: &str, body: String) -> ApiResult<String> {
    let url = url.value();
    let client = reqwest::blocking::Client::new();
    let response = client.post(url).headers(construct_headers(token)).body(body).send()?;

    let response_body = response.text()?;

    Ok(response_body)
}
