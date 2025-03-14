import { HttpException, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class BotService {
  private readonly botBaseUrl = 'http://92.252.240.206:11434';

  async sendMessage(message: string) {
    const url = `${this.botBaseUrl}/api/generate`;
    try {
      const response = await axios.post(url, {
        model: 'ALIENTELLIGENCE/psychologistv2',
        prompt: `Ты отвечаешь на сообщения пользователя, ты создан для поддержки его ментального здоровья,отвечай на русском, обращайся баз пола пример - сделал(а), говори только о ЕГО самочувствии, ввод пользователя - ${message}`,
        stream: false,
      });
      return response.data;
    } catch (e) {
      if (e.response) {
        throw new HttpException(e.response._response, 500);
      }
      if (e.request) {
        throw new HttpException(e.request._response, 500);
      }
      throw new HttpException(e, 500);
    }
  }
}
