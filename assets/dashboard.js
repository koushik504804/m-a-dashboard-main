fetch("data/deals.json")
    .then(response => response.json())
    .then(data => {
        console.log("Loaded data:", data);

        document.getElementById("totalDeals").textContent = data.length;

        const regions = new Set();
        data.forEach(row => {
            if (row["Region"]) {
                regions.add(row["Region"]);
            }
        });

        document.getElementById("totalRegions").textContent = regions.size;

        let totalDealValue = 0;
        let dealValueCount = 0;

        data.forEach(row => {
            const value = Number(row["Deal Value"]);
            if (!isNaN(value) && value > 0) {
                totalDealValue += value;
                dealValueCount++;
            }
        });

        const avgDealValue = dealValueCount > 0
            ? totalDealValue / dealValueCount
            : 0;

        document.getElementById("avgDealValue").textContent =
            avgDealValue.toLocaleString();

        const regionCounts = {};

        data.forEach(row => {
            const region = row["Region"] || "Unknown";
            regionCounts[region] = (regionCounts[region] || 0) + 1;
        });

        new Chart(document.getElementById("dealChart"), {
            type: "bar",
            data: {
                labels: Object.keys(regionCounts),
                datasets: [{
                    label: "Number of Deals by Region",
                    data: Object.values(regionCounts)
                }]
            }
        });
    })
    .catch(error => {
        console.error("Error loading deals.json:", error);
    });
