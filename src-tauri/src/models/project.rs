use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize)]
pub struct Project {
    id: String,
    key: String,
    name: String,
}
