import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getNetworksByScopes } from '../../../../shared/modules/selectors/networks';
import {
  AvatarGroup,
  AvatarType,
  Box,
  Text,
} from '../../component-library';
import Tooltip from '../../ui/tooltip';

export const AccountNetworkIndicator = ({ scopes }) => {
  const networks = useSelector((state) => getNetworksByScopes(state, scopes));
  
  const AVATAR_GROUP_LIMIT = 4;
  const TOOLTIP_LIMIT = 12;

  return (
    <Box data-testid="account-network-indicator">
      <Tooltip
        position="left"
        html={
          <>
            {networks?.slice(0, TOOLTIP_LIMIT).map((network) => (
              <Box
                key={network.chainId}
                display="flex"
                flexDirection="column"
                alignItems="center"
                textAlign="left"
                padding={1}
                paddingInline={2}
                gap={2}
              >
                <AvatarNetwork size="xs" src={CHAIN_ID_TO_NETWORK_IMAGE_URL_MAP[network.chainId]} name={network.name} borderStyle="none" />
                <Text ellipsis>{network.name}</Text>
              </Box>
            ))}
            {networks?.length > TOOLTIP_LIMIT && (
              <Text color="#aaa">{`+${networks.length - TOOLTIP_LIMIT}`}</Text>
            )}
          </>
        }
        arrow offset={0} delay={50} duration={0} size="small" title=""
      >
        <AvatarGroup members={(Array.isArray(networks) ? networks : []).map((n) => ({
          avatarValue: CHAIN_ID_TO_NETWORK_IMAGE_URL_MAP[n.chainId],
          symbol: n.name,
        }))} limit={AVATAR_GROUP_LIMIT} avatarType={AvatarType.NETWORK} size="xl" />
      </Tooltip>
    </Box>
  );
};

AccountNetworkIndicator.propTypes = {
 scopes: PropTypes.arrayOf(PropTypes.string).isRequired,
};
