use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize)]
pub struct Sprint {
    pub values: Vec<SprintValue>,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct SprintValue {
    id: u32,
}
