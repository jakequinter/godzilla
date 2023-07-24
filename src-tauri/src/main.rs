// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use command::{fetch_projects, myself};

mod api;
mod command;
mod error;
mod models;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![fetch_projects, myself])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
