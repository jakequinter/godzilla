// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use command::{fetch_active_sprint, fetch_active_sprint_issues, fetch_projects, myself};
use commands::board_commands::{fetch_board, fetch_board_config};
use commands::transition_commands::fetch_transitions;

mod api;
mod command;
mod error;
mod commands {
    pub mod board_commands;
    pub mod transition_commands;
}
mod models {
    pub mod board;
    pub mod issue;
    pub mod project;
    pub mod sprint;
    pub mod transition;
    pub mod url;
    pub mod user;
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            fetch_active_sprint,
            fetch_active_sprint_issues,
            fetch_board,
            fetch_board_config,
            fetch_projects,
            fetch_transitions,
            myself
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
