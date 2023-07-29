use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize)]
pub struct Board {
    pub values: Vec<BoardValue>,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct BoardValue {
    pub id: u32,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct BoardColumn {
    #[serde(rename = "columnConfig")]
    column_config: BoardColumnConfig,
}

#[derive(Debug, Deserialize, Serialize)]
struct BoardColumnConfig {
    columns: Vec<BoardColumnConfigColumn>,
}

#[derive(Debug, Deserialize, Serialize)]
struct BoardColumnConfigColumn {
    name: String,
    statuses: Vec<BoardColumnConfigColumnStatus>,
}

#[derive(Debug, Deserialize, Serialize)]
struct BoardColumnConfigColumnStatus {
    id: String,
}
