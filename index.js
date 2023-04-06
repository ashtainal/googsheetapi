(async () => {
    try {
        // ***** SQL QUERY TO GOOGLE SHEET *****
        const query = encodeURIComponent(
            "SELECT A, B, C WHERE A LIKE 'Pa%' AND D = 'CA' ORDER BY C ASC LIMIT 5"
        );

        // convert to url query
        const spreadsheetId = "132tSKc4o0Qi1FFwHBMuls5fLK9KoBV0TY2BOnzydwe0";
        const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:json&tq=${query}`;

        // fetch & process data
        const response = JSON.parse((await (await fetch(url)).text()).slice(47, -2))
            .table.rows;

        // return result
        console.log({
            result: response.map(
                (row, idx) => `${idx + 1}: ${row.c[0].v} ${row.c[1].v} - ${row.c[2].v}`
            ),
        });
    } catch {
        // return error
        console.log("Error occurred while fetching data from Google Spreadsheet");
    }
})();
