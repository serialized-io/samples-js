import {v4 as uuidv4} from 'uuid'

export default defineNuxtPlugin(() => {
      return {
        provide: {
          user: () => {
            try {
              let customerId = localStorage.getItem('serialized-demo-customerId');
              if (!customerId) {
                customerId = uuidv4()
                localStorage.setItem('serialized-demo-customerId', customerId)
              }
              return {
                customerId,
                name: 'John Doe',
                email: 'johndoe@example.com'
              }
            } catch (e) {
              console.error(e)
              return {
              }
            }

          }
        }
      }
    }
)
