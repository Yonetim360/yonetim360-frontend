import {
  CustomerStatusMap,
  CommunicationStatusMap,
  OfferStatusMap,
  SupportStatusMap,
  UnknownStatus as unknownStatus,
} from "./StatusMaps";

const statusMaps = {
  customer: CustomerStatusMap,
  communication: CommunicationStatusMap,
  offer: OfferStatusMap,
  support: SupportStatusMap,
};

export const getStatus = (type, status) => {
  const map = statusMaps[type] || {};
  return map[status] || unknownStatus;
};
