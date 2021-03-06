import {useState,useContext,useEffect} from 'react'
import AuthContext from '../context/auth/AuthContext'

import {Flex,
    Box,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Button,
    useToast, 
    Spinner,
    Center} from "@chakra-ui/react"

const Login = props => {

    const authContext = useContext(AuthContext)
    const {login,isAuthenticated,error,user} = authContext

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [isLoginLoading, setIsLoginLoading] = useState(false)

    const errorToast = useToast()

    const onChangeUsername = e => {
        setUsername(e.target.value)
    }

    const onChangePassword = e => {
        setPassword(e.target.value)
    }

    useEffect(() => {

                if(error !== null){
                    setUsername('')
                    setPassword('')
                }

                if(isAuthenticated == "true"){
                      props.history.push('/community')
                }
               

        
    }, [error,isAuthenticated]);
    const onSubmit = e => {
        e.preventDefault()
        if(username !== '' && password !== ''){
            const data = {
                username,
                password
            }
            setIsLoginLoading(true)
            login(data).then(_ => {
              setIsLoginLoading(false)
            } )
        }else{
          errorToast({
            title: 'Empty Fields',
            description: "Fill all the fields.",
            status: "error",
            duration: 4000,
            isClosable: true,
        })
        }
    }

    return (
        <Flex width="full" direction="column" align="center" justifyContent="center"> 
        <Box bg="brand.100" p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg" marginTop={50}>
       <Center>
         <Spinner
            hidden={!isLoginLoading}
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
         </Center> 
          <Box textAlign="center">
            <Heading>Login</Heading>
          </Box>
          <Box my={4} textAlign="left">
            <form onSubmit={onSubmit}>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input type="text" value={username} placeholder="test" onChange={onChangeUsername} />
              </FormControl>
              <FormControl mt={6}>
                <FormLabel>Password</FormLabel>
                <Input type="password" value={password} placeholder="*******" onChange={onChangePassword} />
              </FormControl>
              <Button width="full" mt={4} type="submit">
                Sign In
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    )
}

export default Login
