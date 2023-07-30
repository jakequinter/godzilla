use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize)]
pub struct Project {
    id: String,
    key: String,
    name: String,
}
