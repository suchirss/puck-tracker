import os
import cv2 as cv
import numpy as np

script_dir = os.path.dirname(__file__)

config_path = os.path.join(script_dir, "config.json")
needleImageSrc = os.path.join(script_dir, "assets", "kadri-slow-mo-breakaway-goal-image-early-frame-puck-close-up.JPG")
haystackImageSrc = os.path.join(script_dir, "assets", "kadri-slow-mo-breakaway-goal-image-early-frame.JPG")
puckImageSrc = os.path.join(script_dir, "assets", "hockey-puck-high-angle.JPG")

# print("This is the config path: ", config_path)
# print("This is the haystack path: ", needleImageSrc)
# print("This is the needle path: ", haystackImageSrc)

needle = cv.imread(needleImageSrc, cv.IMREAD_UNCHANGED)
puckImage = cv.imread(puckImageSrc, cv.IMREAD_UNCHANGED)
haystack = cv.imread(haystackImageSrc, cv.IMREAD_UNCHANGED)

result = cv.matchTemplate(haystack, needle, cv.TM_CCOEFF_NORMED)

minVal, maxVal, minLoc, maxLoc = cv.minMaxLoc(result)
# print(maxVal, maxLoc)

needleWidth = needle.shape[1]
needleHeight = needle.shape[0]

topLeft = maxLoc
bottomRight = (topLeft[0] + needleWidth, topLeft[1] + needleHeight)

cv.rectangle(haystack, topLeft, bottomRight, color=(0, 255, 0), thickness=2, lineType=cv.LINE_4)    

cv.imshow("Result", result)
cv.waitKey()