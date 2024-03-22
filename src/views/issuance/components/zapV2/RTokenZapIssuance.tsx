import { ArrowDown } from 'react-feather'
import { Box, Divider } from 'theme-ui'
import ZapOperationDetails from './ZapOperationDetails'
import ZapTabs from './ZapTabs'
import ZapInputContainer from './input/ZapInputContainer'
import ZapOutputContainer from './output/ZapOutputContainer'
import ZapSubmit from './submit/ZapSubmit'

const RTokenZapIssuance = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'stretch',
        borderRadius: '14px',
        bg: 'background',
        boxShadow: '0px 10px 38px 6px rgba(125, 125, 125, 0.1)',
      }}
    >
      <Box p="24px">
        <ZapTabs />
      </Box>
      <Divider m={0} />
      <Box
        p="24px"
        sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <ZapInputContainer />
          <Box variant="layout.verticalAlign" sx={{ gap: '12px', px: 3 }}>
            <Divider sx={{ flexGrow: 1 }} />
            <Box
              p="1"
              pb="0"
              sx={{
                border: '1px solid',
                borderColor: 'border',
                borderRadius: '6px',
                backgroundColor: 'inputAlternativeBackground',
              }}
            >
              <ArrowDown size={24} strokeWidth={1.2} color="#666666" />
            </Box>
            <Divider sx={{ flexGrow: 1 }} />
          </Box>
          <ZapOutputContainer />
        </Box>
        <ZapOperationDetails />
        <ZapSubmit />
      </Box>
    </Box>
  )
}

export default RTokenZapIssuance
