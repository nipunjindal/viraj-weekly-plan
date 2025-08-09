# Viraj's Weekly Plan

This project is a simple web-based viewer for a weekly plan created for my son, Viraj. It's designed to be a clean and simple way to view the plan on both desktop and mobile devices.

## How to Use

To view the weekly plan, simply open the `index.html` file in your web browser. You can navigate between weeks using the "Previous Week" and "Next Week" buttons.

## Project Structure

- `index.html`: The main HTML file for the website.
- `style.css`: The stylesheet for the website.
- `script.js`: The JavaScript file that loads the data and handles interactivity.
- `data/plan.json`: The weekly plan data in JSON format.
- `weekly_plan.xlsx`: The original weekly plan in Excel format.
- `plan.py`: A Python script to convert the Excel file to JSON.

## How to Update the Plan

1.  Modify the `weekly_plan.xlsx` file with your new weekly plan.
2.  Run the `plan.py` script from your terminal to update the website's data:
    ```bash
    python plan.py
    ```
    This will regenerate the `data/plan.json` file.
3.  Commit and push the updated `data/plan.json` file to your GitHub repository. The website will be automatically updated on GitHub Pages.
