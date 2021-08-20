const connection = require('../config/database')
const { IssueStatus } = require('../constants/issue_status')

export const insertIssueReport = async (userId, data) => {
    let query = 'INSERT INTO Issue_Report (Iss_Title, Iss_Category, Iss_Status, Iss_Sentemail, Iss_Detail, Iss_Pat_ID) '
    query += 'VALUES (?, ?, ?, ?, ?, ?);'
  
    try {
        const result = await connection.promise().execute(
            query,
            [ data.title, data.category, IssueStatus.CREATED, data.email, data.detail, userId ]
        )
        return result[0].insertId
    } catch (error) {
        throw new Error(`Insert New Issue Report: ${error.message}`)
    }
}

export const getAllIssueReports = async () => {
    let query = 'SELECT * FROM Issue_Report;'

    try {
        const result = await connection.promise().execute(query)
        return result[0]
    } catch (error) {
        throw new Error(`Get All Issue Reports: ${error.message}`)
    }
}

export const getIssueReportByID = async (issueId) => {
    let query = 'SELECT * FROM Issue_Report WHERE ID = ? ;'

    try {
        const result = await connection.promise().execute(query, [issueId])
        return result[0][0]
    } catch (error) {
        throw new Error(`Get Issue Report By Issue ID: ${error.message}`)
    }
}

export const updateIssueStatus = async (issueId, status) => {
    let query = 'UPDATE Issue_Report SET Iss_Status = ? WHERE ID = ? ;'

    try {
        const result = await connection.promise().execute(query, [ status.toUpperCase(), issueId ])
        return result[0].affectedRows
    } catch (error) {
        throw new Error(`Update Issue Status By Issue Id: ${error.message}`)
    }
}