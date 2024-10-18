import { prisma } from '../../../lib/prisma'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      console.log('Fetching all levels')
      const levels = await prisma.level.findMany()
      console.log('Levels fetched successfully:', levels.length)
      res.status(200).json(levels)
    } catch (error) {
      console.error('Failed to fetch levels:', error)
      res.status(500).json({ error: 'Failed to fetch levels' })
    }
  } else if (req.method === 'POST') {
    const { title, content } = req.body
    if (!title || !content) {
      console.log('Title or content missing in request body')
      return res.status(400).json({ error: 'Title and content are required' })
    }
    try {
      console.log('Creating new level with title:', title)
      const newLevel = await prisma.level.create({
        data: { title, content },
      })
      console.log('New level created successfully:', newLevel.id)
      res.status(201).json(newLevel)
    } catch (error) {
      console.error('Failed to create level:', error)
      res.status(500).json({ error: 'Failed to create level' })
    }
  } else {
    console.log('Method not allowed:', req.method)
    res.status(405).json({ message: 'Method not allowed' })
  }
}