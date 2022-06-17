from musdl import Score, OnlineScore

my_score = OnlineScore("https://musescore.com/user/12461571/scores/3291706")

# Read the score's metadata,
# name = my_score["workTitle"]
# or save the whole score...
my_score.export("mid", "test.mid")

# ...and then load it again.
# my_score = Score.from_file("my_score.mscz")




# import time
# from selenium import webdriver
# from selenium.webdriver.chrome.service import Service
# from selenium.webdriver.chrome.options import Options 
# from selenium.webdriver.common.by import By
# from selenium.webdriver.support.ui import Select
# from selenium.common.exceptions import NoSuchElementException
# s = Service("D:\chromedriver.exe")

# options = webdriver.ChromeOptions()
# options.add_argument(r"user-data-dir=C:\\Users\\Andrew\\AppData\\Local\\Google\\Chrome\\User Data\\Profile 1")

# driver = webdriver.Chrome(service=s, options=options) 

# url = "https://musescore.com/user/16006641/scores/4197961"
# driver.get(url)
# # time.sleep(30)
# # link = driver.find_element(by=By.XPATH,value='/html/body/div[1]//div/button[4]/span')
# # # link = driver.find_elements_by_css_selector("frame")
# # print(link)

# song_root = driver.execute_script("return document.querySelector('div').shadowRoot")
# # a = song_root.find_elements(By.TAG_NAME,"button")
# print(song_root)