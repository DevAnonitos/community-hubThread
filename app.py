import pandas as pd
import streamlit as st

st.set_page_config(page_title="Sales Dashboard", page_icon=":bar_chart", layout="wide")

df = pd.read_csv(
    filepath_or_buffer="D:/2-bai tap cua dev/Project training web/ComunityHub-app/dashboard/supermarket_sales.csv",
    engine="python"
)

st.dataframe(df)

st.sidebar.header("Please enter field here...")
city = st.sidebar.multiselect(
    "Select the city:",
    options=df["City"].unique().tolist(),
    default=df["City"].unique().tolist(),
    key="city_multiselect",
)

customer_type= st.sidebar.multiselect(
    "Select the Customer type:",
    options=df["Customer_type"].unique().tolist(),
    default=df["Customer_type"].unique().tolist(),
    key="customer_type_multiselect",
)

gender = st.sidebar.multiselect(
    "Select the Gender:",
    options=df["Gender"].unique().tolist(),
    default=df["Gender"].unique().tolist(),
    key="gender_multiselect",
)

df_selection = df.query(
    "City == @city & `Customer_type` == @customer_type & Gender == @gender"
)

