const express = require('express')
const router = express.Router()

const { IssueStatus } = require('../constants/issue_status')
const issueService = require('../services/issue_service') 

// Get all issue reports
router.get('/', async (req, res) => {
    try {
        const result = await issueService.getAllIssueReports()
        return res.status(200).json({ data: result })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

// Get issue report by issue id
router.get('/:issueId', async (req, res) => {
    try {
        const result = await issueService.getIssueReportByID(req.params.issueId)
        return res.status(200).json({ data: result })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

// Update issue status by issue id
router.patch('/:issueId', async (req, res) => {
    const { status } = req.body

    try {
        if(Object.values(IssueStatus).toString().includes(status)) {
            const result = await issueService.updateIssueStatus(req.params.issueId, status)
            if(result == 1) {
                return res.status(200).json({ data: "Issue status has been updated." })
            }
        }

        return res.status(400).json({ error: "Invalid Issue status." })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

// Create new issue report
router.post('/user/:userId', async (req, res) => {
    try {
        const result = await issueService.insertIssueReport(req.params.userId, req.body)
        return res.status(200).json({ data: result })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

module.exports = router