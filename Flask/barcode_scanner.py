from pyzbar.pyzbar import decode
from PIL import Image
import cv2


def scan_barcode():
    cap = cv2.VideoCapture(0)

    while True:
        ret, img = cap.read()
        cv2.imshow("camera", img)

        # Convert the NumPy array to a PIL Image
        image_barcode = Image.fromarray(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))

        decoded = decode(image_barcode)

        if decoded:
            with open('product.txt', 'w') as file:
                # Write the decoded data to a file
                file.write(decoded[0].data.decode("utf-8"))
            print(decoded[0].data.decode("utf-8"))
            break

        if cv2.waitKey(10) == 27:
            break

    cap.release()
    cv2.destroyAllWindows()
