function calculateSummaryStatistics(data) {
    if (data.length === 0) {
        return { mean: 0, min: 0, max: 0 };
    }

    const mean = data.reduce((acc, val) => acc + val, 0) / data.length;
    const min = Math.min(...data);
    const max = Math.max(...data);
    return { mean, min, max };
}

module.exports = {
    calculateSummaryStatistics
};
