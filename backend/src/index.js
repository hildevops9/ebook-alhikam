import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import hikamRouter from './routes/hikam.js'
import chatRouter from './routes/chat.js'

const app = express()
const PORT = process.env.PORT || 3001

// Security & middleware
app.use(helmet())
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}))
app.use(express.json({ limit: '10kb' }))

// Routes
app.use('/api/hikam', hikamRouter)
app.use('/api/chat', chatRouter)

// Health check
app.get('/api/health', (_, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.listen(PORT, () => {
  console.log(`🕌 Al-Hikam API berjalan di http://localhost:${PORT}`)
})

export default app
