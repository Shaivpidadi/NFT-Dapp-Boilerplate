import React, { Fragment, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useWeb3React } from "@web3-react/core";

import { useColorContract } from "../../hooks";
import Loader from "../Loader/Loader";

const DummyNFT = () => {
  const [mintedColors, setMintedColors] = useState([]);
  const [color, setColor] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { account, deactivate } = useWeb3React();
  const colorContract = useColorContract();

  const onMintClick = async () => {
    try {
      setIsLoading(true);
      const gasLimit = await colorContract.methods
        .mint(color)
        .estimateGas({ from: account });
      await colorContract.methods.mint(color).send({
        from: account,
        gasLimit,
      });
      setColor("");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  useEffect(() => {
    const loadColors = async () => {
      const totalSupply = await colorContract.methods
        .totalSupply()
        .call({ from: account });
      setMintedColors([]);

      // Load Colors
      for (var i = 1; i <= totalSupply; i++) {
        const color = await colorContract.methods.colors(i - 1).call();
        setMintedColors((oldState) => [...oldState, color]);
      }
    };

    if (colorContract && !isLoading) {
      loadColors();
    }

  }, [colorContract, account, isLoading]);

  const onLogoutClick = () => {
    deactivate();
    localStorage.clear();
    localStorage.setItem("shouldEagerConnect", false);
  };

  return (
    <Fragment>
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="logout">
            <Button onClick={onLogoutClick}>LOGOUT</Button>
          </div>
          <main role="main" className="col-lg-12 d-flex text-center">
            <div className="content mr-auto ml-auto">
              <h1>Issue Token</h1>
              <input
                type="text"
                value={color}
                className="form-control mb-1"
                placeholder="e.g. #FFFFFF"
                disabled={isLoading}
                onChange={(event) => setColor(event.target.value)}
              />
              <Button
                variant="outline-primary"
                disabled={!color || isLoading}
                onClick={onMintClick}
              >
                MINT
              </Button>
            </div>
          </main>
        </div>
        <hr />
        <div className="container text-center">
          {mintedColors
            ? mintedColors.map((color, key) => {
              return (
                <div
                  key={key}
                  className="token"
                  style={{ backgroundColor: color }}
                >
                  <div>{color}</div>
                </div>
              );
            })
            : null}
        </div>

      </div>
      {isLoading && <Loader />}
    </Fragment>

  );
};

export default DummyNFT;
