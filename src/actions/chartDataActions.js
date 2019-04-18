import url from "../config"



let chartDefault = () => ({ type: "CHART_DEFAULT" })
let chartPending = () => ({ type: "CHART_DATA_PENDING" })
let chartResolved = chartData => ({ type: "CHART_DATA_RESOLVED", payload: chartData})
let chartError = () => ({ type: "CHART_DATA_ERROR" })


let getChartData = () =>
    async dispatch => {

        await dispatch(chartPending())
        try {
            let result = await fetch(`${url}chart`, {
                method: "GET",
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(r => r.json())
            await dispatch(chartResolved(result))

        } catch (e) {
            await dispatch(chartError())
        }
    }

  

export { getChartData, chartDefault }