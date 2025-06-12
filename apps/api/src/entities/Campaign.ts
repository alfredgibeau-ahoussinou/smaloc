import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Client } from './Client';

@Entity('campaign')
export class Campaign {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  platform!: string;

  @Column({ type: 'text', nullable: true })
  description!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  budget!: number;

  @Column({
    type: 'enum',
    enum: ['draft', 'active', 'paused', 'completed'],
    default: 'draft',
  })
  status!: 'draft' | 'active' | 'paused' | 'completed';

  @Column({ type: 'jsonb', default: {} })
  metrics!: {
    impressions: number;
    clicks: number;
    conversions: number;
  };

  @ManyToOne(() => Client, (client) => client.campaigns)
  @JoinColumn({ name: 'clientId' })
  client!: Client;

  @Column()
  clientId!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
} 