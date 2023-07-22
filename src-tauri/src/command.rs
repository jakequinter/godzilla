use crate::api::get_request;
use crate::error::TauriError;
use crate::models::{ApiResult, User, Url};

#[tauri::command]
pub fn myself(token: &str) -> ApiResult<User> {
    let response = get_request(Url::WithBaseUrl("/myself"), token)?;

    if !response.starts_with("{") {
        let error = Err(TauriError {
            message: "Invalid credentials",
        });
        return error;
    }

    let data = serde_json::from_str(&response).unwrap();

    return Ok(data)

}
