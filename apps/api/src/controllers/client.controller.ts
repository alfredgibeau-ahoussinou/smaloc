import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Client } from '../entities/Client';

const clientRepository = AppDataSource.getRepository(Client);

export const clientController = {
  async getClients(req: Request, res: Response) {
    try {
      const clients = await clientRepository.find({
        where: { isActive: true },
        order: { name: 'ASC' },
      });
      res.json({ success: true, data: clients });
    } catch (error) {
      console.error('Error fetching clients:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch clients',
      });
    }
  },

  async getClient(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const client = await clientRepository.findOne({
        where: { id, isActive: true },
      });

      if (!client) {
        return res.status(404).json({
          success: false,
          message: 'Client not found',
        });
      }

      res.json({ success: true, data: client });
    } catch (error) {
      console.error('Error fetching client:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch client',
      });
    }
  },

  async createClient(req: Request, res: Response) {
    try {
      const { name, email, phone, address } = req.body;

      const existingClient = await clientRepository.findOne({
        where: { email },
      });

      if (existingClient) {
        return res.status(400).json({
          success: false,
          message: 'A client with this email already exists',
        });
      }

      const client = clientRepository.create({
        name,
        email,
        phone,
        address,
        isActive: true,
      });

      await clientRepository.save(client);
      res.status(201).json({ success: true, data: client });
    } catch (error) {
      console.error('Error creating client:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create client',
      });
    }
  },

  async updateClient(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, email, phone, address, isActive } = req.body;

      const client = await clientRepository.findOne({
        where: { id },
      });

      if (!client) {
        return res.status(404).json({
          success: false,
          message: 'Client not found',
        });
      }

      if (email && email !== client.email) {
        const existingClient = await clientRepository.findOne({
          where: { email },
        });

        if (existingClient) {
          return res.status(400).json({
            success: false,
            message: 'A client with this email already exists',
          });
        }
      }

      clientRepository.merge(client, {
        name,
        email,
        phone,
        address,
        isActive,
      });

      const updatedClient = await clientRepository.save(client);
      res.json({ success: true, data: updatedClient });
    } catch (error) {
      console.error('Error updating client:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update client',
      });
    }
  },

  async deleteClient(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const client = await clientRepository.findOne({
        where: { id },
      });

      if (!client) {
        return res.status(404).json({
          success: false,
          message: 'Client not found',
        });
      }

      client.isActive = false;
      await clientRepository.save(client);

      res.json({
        success: true,
        message: 'Client deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting client:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete client',
      });
    }
  },
}; 