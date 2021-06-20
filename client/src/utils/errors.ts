import { defaultTheme } from '../theme'
import { createStandaloneToast } from '@chakra-ui/react'

const toast = createStandaloneToast({ theme: defaultTheme })

const errors = {
    show: (msg: string) =>
        toast({
            title: 'Error: ' + msg,
            status: 'error',
            variant: 'solid',
            isClosable: true,
        }),
}

export default errors
