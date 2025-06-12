import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Campaign } from '../entities/Campaign';

const campaignRepository = AppDataSource.getRepository(Campaign);

export const getCampaigns = async (req: Request, res: Response) => {
  try {
    const campaigns = await campaignRepository.find({
      relations: ['client'],
    });

    res.json(campaigns);
  } catch (error) {
    console.error('Erreur lors de la récupération des campagnes:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des campagnes' });
  }
};

export const getCampaign = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const campaign = await campaignRepository.findOne({
      where: { id },
      relations: ['client'],
    });

    if (!campaign) {
      return res.status(404).json({ message: 'Campagne non trouvée' });
    }

    res.json(campaign);
  } catch (error) {
    console.error('Erreur lors de la récupération de la campagne:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération de la campagne' });
  }
};

export const createCampaign = async (req: Request, res: Response) => {
  try {
    const { name, platform, description, budget, clientId } = req.body;

    const campaign = campaignRepository.create({
      name,
      platform,
      description,
      budget,
      status: 'draft',
      client: { id: clientId },
    });

    await campaignRepository.save(campaign);

    res.status(201).json(campaign);
  } catch (error) {
    console.error('Erreur lors de la création de la campagne:', error);
    res.status(500).json({ message: 'Erreur lors de la création de la campagne' });
  }
};

export const updateCampaign = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, platform, description, budget, status, clientId } = req.body;

    const campaign = await campaignRepository.findOne({
      where: { id },
    });

    if (!campaign) {
      return res.status(404).json({ message: 'Campagne non trouvée' });
    }

    campaignRepository.merge(campaign, {
      name,
      platform,
      description,
      budget,
      status,
      client: { id: clientId },
    });

    const updatedCampaign = await campaignRepository.save(campaign);

    res.json(updatedCampaign);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la campagne:', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la campagne' });
  }
};

export const deleteCampaign = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const campaign = await campaignRepository.findOne({
      where: { id },
    });

    if (!campaign) {
      return res.status(404).json({ message: 'Campagne non trouvée' });
    }

    await campaignRepository.remove(campaign);

    res.json({ message: 'Campagne supprimée avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de la campagne:', error);
    res.status(500).json({ message: 'Erreur lors de la suppression de la campagne' });
  }
}; 