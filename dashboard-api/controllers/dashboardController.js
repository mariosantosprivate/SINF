function getMetrics(req, res) {
  return res.json({
    message: 'GET Dashboard Metrics'
  });
}

module.exports = {
  getMetrics
}