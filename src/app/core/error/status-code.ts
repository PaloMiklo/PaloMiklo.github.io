export const HttpStatus: Record<number, string> = {
    1: 'Informational response\nThe request was received, continuing process.',
    2: 'Success\nThe request was successfully received, understood, and accepted.',
    3: 'Redirection\nFurther action needs to be taken in order to complete the request.',
    4: 'Client error\nThe request contains bad syntax or cannot be fulfilled.',
    5: 'Server error\nThe server failed to fulfil an apparently valid request.'
}