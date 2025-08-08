def encrypt(inputText: str, n = 3, d = 1) -> str:
    """
    This returns the encrypted version of string.

    Args:
        inputText (str): not encrypted string
        n (int): number of positions to shift characters in the inputText
        d (int): direction of shift

    Returns:
        str: encrypted string
    """
    reversed = inputText[::-1]
    encryptedText = ""
    for letter in reversed:
        coded = ord(letter) + n * d
        if coded >= 34 and coded <= 126:
            encryptedText += chr(coded)
    return encryptedText

def decrypt(inputText: str, n = 3, d = 1) -> str:
    """
    This returns the encrypted version of string.

    Args:
        inputText (str): not encrypted string
        n (int): number of positions to shift characters in the inputText
        d (int): direction of shift

    Returns:
        str: encrypted string
    """
    reversed = inputText[::-1]
    encryptedText = ""
    for letter in reversed:
        coded = ord(letter) - n * d
        if coded >= 34 and coded <= 126:
            encryptedText += chr(coded)
    return encryptedText