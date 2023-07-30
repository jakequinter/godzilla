use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize)]
pub struct Board {
    pub values: Vec<BoardValue>,
}

#[derive(Deserialize, Serialize)]
pub struct BoardValue {
    pub id: u32,
}

#[derive(Deserialize, Serialize)]
pub struct BoardColumn {
    #[serde(rename = "columnConfig")]
    column_config: BoardColumnConfig,
}

#[derive(Deserialize, Serialize)]
struct BoardColumnConfig {
    columns: Vec<BoardColumnConfigColumn>,
}

#[derive(Deserialize, Serialize)]
struct BoardColumnConfigColumn {
    name: String,
    statuses: Vec<BoardColumnConfigColumnStatus>,
}

#[derive(Deserialize, Serialize)]
struct BoardColumnConfigColumnStatus {
    id: String,
}
