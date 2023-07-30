use anyhow::Error as AnyhowError;
use reqwest::StatusCode;
use std::fmt::{Display, Formatter};

pub struct TauriError {
    pub message: String,
}

impl From<reqwest::Error> for TauriError {
    fn from(error: reqwest::Error) -> Self {
        TauriError::from_reqwest_error(&error)
    }
}

impl From<AnyhowError> for TauriError {
    fn from(error: AnyhowError) -> Self {
        if let Some(req_error) = error.downcast_ref::<reqwest::Error>() {
            TauriError::from_reqwest_error(&req_error)
        } else {
            TauriError {
                message: "An unknown error occurred".to_string(),
            }
        }
    }
}

impl TauriError {
    fn from_reqwest_error(error: &reqwest::Error) -> Self {
        let error_message = match error.status() {
            Some(StatusCode::FORBIDDEN) => "This endpoint requires a token",
            Some(StatusCode::BAD_REQUEST) => "There was a problem with your request",
            _ => "Something went wrong handling this request",
        };
        TauriError {
            message: error_message.to_string(),
        }
    }
}

impl serde::Serialize for TauriError {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::ser::Serializer,
    {
        serializer.serialize_str(&self.message)
    }
}

impl Display for TauriError {
    fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
        f.write_str(&self.message)
    }
}
