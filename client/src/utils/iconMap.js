import { GiTooth, GiSparkles } from 'react-icons/gi';
import { FaTooth, FaChild, FaTeethOpen } from 'react-icons/fa';
import { MdOutlineCleanHands } from 'react-icons/md';
import { BsBraces } from 'react-icons/bs';

const iconMap = {
  tooth: FaTooth,
  sparkles: GiSparkles,
  implant: GiTooth,
  braces: BsBraces,
  clean: MdOutlineCleanHands,
  child: FaChild,
  default: FaTeethOpen,
};

export const getServiceIcon = (key) => iconMap[key] || iconMap.default;
