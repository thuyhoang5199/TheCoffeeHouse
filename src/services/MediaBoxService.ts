import { get, isNil } from 'lodash';
import { MediaBox } from '../models/mediaBox/MediaBox';
import { HttpService } from './HttpService';

export const MediaBoxService = {
  getMenu: (): Promise<MediaBox[]> =>
    HttpService.tch.get('media/media-box').then(({ data }) => {
      if (!isNil(data.data)) {
        return data.data.filter(
          (item: MediaBox) => item.icon_web != null,
        ) as MediaBox[];
      } else return [];
    }),
};
