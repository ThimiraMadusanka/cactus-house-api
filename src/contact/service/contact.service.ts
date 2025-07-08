import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CONTACT, PENDING } from 'src/constants/constants';
import { ContactModel } from '../entities/contact.entity';
import { ContactCreateDto } from '../dto/contactCreate.dto';

@Injectable()
export class ContactService {
  constructor(
    @Inject(CONTACT)
    private Contact: typeof ContactModel,
  ) {}

  async getContacts(page: number = 0, size: number = 10, status?: string) {
    const offset = (page - 1) * size;
    let whereClause: any;

    if (status) {
      whereClause = {
        status: status,
      };
    }

    const contactList = await this.Contact.findAndCountAll({
      limit: size,
      offset: offset,
      where: whereClause,
      raw: true,
    });

    return {
      page: page,
      size: size,
      totalCount: contactList.count,
      data: contactList.rows,
    };
  }

  async getContactById(id: any) {
    const contact = await this.Contact.findOne({
      where: {
        id: id,
      },
      raw: true,
    });

    if (!contact) {
      throw new HttpException(
        `Contact not found with id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    return contact;
  }

  async createContact(contactCreateDto: ContactCreateDto) {
    const { name, email, message } = contactCreateDto;

    const contact = await this.Contact.create({
      name: name,
      email: email,
      message: message,
      status: PENDING,
    });

    return contact.toJSON();
  }

  async contactStatusChange(id: any, status: string) {
    const contact = await this.Contact.findOne({
      where: {
        id: id,
      },
      raw: true,
    });

    if (!contact) {
      throw new HttpException(
        `Contact not found with id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.Contact.update(
      {
        status: status,
        updatedAt: new Date(),
      },
      {
        where: {
          id: id,
        },
      },
    );

    throw new HttpException(
      `Contact status change with id ${id}`,
      HttpStatus.OK,
    );
  }

  async deleteContact(id: any) {
    const contact = await this.Contact.findOne({
      where: {
        id: id,
      },
      raw: true,
    });

    if (!contact) {
      throw new HttpException(
        `Contact not found with id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.Contact.destroy({
      where: {
        id: id,
      },
    });
  }
}
