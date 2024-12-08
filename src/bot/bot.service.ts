import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class BotService {
  private readonly botBaseUrl = 'http://localhost:11153';

  async forwardRequest(endpoint: string, method: 'GET' | 'POST', data?: any) {
    const url = `${this.botBaseUrl}/${endpoint}`;
    const response = await axios({
      url,
      method,
      data,
    });
    return response.data;
  }
}
