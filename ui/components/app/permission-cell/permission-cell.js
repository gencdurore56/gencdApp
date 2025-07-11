import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useSelector } from 'react-redux';
import {
  AlignItems,
  Color,
  IconColor,
  JustifyContent,
  Size,
  TextColor,
  TextVariant,
  Display,
  BlockSize,
  FlexWrap,
  FlexDirection,
} from '../../../helpers/constants/design-system';
import {
  AvatarIcon,
  AvatarIconSize,
  Icon,
  IconName,
  IconSize,
  Text,
  Box
} from '../../component-library';
import Tooltip from '../../ui/tooltip';
import { getRequestingNetworkInfo } from '../../../selectors';
import { PermissionCellOptions } from './permission-cell-options';
import { PermissionCellStatus } from './permission-cell-status';

const PermissionCell = ({
  snapId, permissionName, title, description, weight, avatarIcon, dateApproved, revoked, approved, showOptions, hideStatus, accounts, chainIds
}) => {
  
    const infoIcon = IconName.Info;
    const isWarning = !revoked && weight <=2;
    const isApprovedOrDate = dateApproved || approved;
    
    const iconColor = revoked || isApprovedOrDate ? IconColor.iconMuted : (isWarning ? IconColor.warningDefault : IconColor.primaryDefault);
    const iconBackgroundColor =
      revoked || isApprovedOrDate ? Color.backgroundAlternative : (isWarning ? Color.warningMuted : Color.primaryMuted);
    const infoIconColor = isWarning ? IconColor.warningDefault : IconColor.iconMuted;

    let permissionIcon = typeof avatarIcon === 'string' 
      ? avatarIcon 
      : avatarIcon?.props?.iconName ?? avatarIcon;

    const networksInfo = useSelector(state => getRequestingNetworkInfo(state, chainIds));

    return (
      <Box
        className="permission-cell"
        display={Display.Flex}
        justifyContent={JustifyContent.center}
        alignItems={AlignItems.flexStart}
        paddingTop={2}
        paddingBottom={2}
      >
        <Box display={Display.Flex}>
          {typeof permissionIcon === 'string' ? (
            <AvatarIcon
              iconName={permissionIcon}
              size={AvatarIconSize.Md}
              iconProps={{ size: IconSize.Sm }}
              color={iconColor}
              backgroundColor={iconBackgroundColor}
            />
          ) : (
            permissionIcon
          )}
        </Box>
        
        <Box
          display={Display.Flex}
          flexWrap={FlexWrap.Wrap}
          flexDirection={FlexDirection.Column}
          width={BlockSize.Full}
          marginLeft={4} marginRight={4}>
          
          <Text
            size={Size.MD} variant= {TextVariant.bodyMd }
            className= {classnames('permission-cell__title', {'permission-cell__title-revoked': revoked})}>
            {title}</Text>
          
           {!hideStatus && (
             <PermissionCellStatus 
               revoked= {revoked} 
               approved= {approved} 
               dateApproved= {dateApproved} 
               accounts= {accounts} 
               networks= {(networksInfo || null)} />
           )}
           
         </Box>
         
         <Box display ={Display.Flex}>
           {(showOptions && snapId) ?
             (<PermissionCellOptions snapId ={snapId} permissionName ={permissionName} description ={description}/>) :
             (description &&
                <Tooltip html={<Text variant ={TextVariant.bodySm} color ={TextColor.textAlternative}>{description}</Text>} position="bottom">
                  <Icon color ={infoIconColor} name ={infoIcon } size ={IconSize.Sm}/>
                </Tooltip>)
           }
         </Box>
       </Box>);
};

PermissionCell.propTypes={
   snapId: PropTypes.string,

   permissionName: PropTypes.oneOfType([
     PropTypes.string.isRequired,

     PropTypes.element]).isRequired,

   title: PropTypes.oneOfType([PropTypes.string.isRequired ,PropTypes.object.isRequired]),

   description: PropTypes.oneOfType([PropTypes.string ,PropTypes.object]),

   weight: PropTypes.number,

   avatarIcon: PropTypes.any.isRequired,

   dateApproved: PropTypes.number,

   revoked:PropTypes.bool,

   approved:PropTypes.bool,

   showOptions:PropTypes.bool,

   hideStatus:PropTypes.bool ,

   accounts:PropTypes.array ,

chainIds:Prop.Types.array};

export default PermissionCell;
