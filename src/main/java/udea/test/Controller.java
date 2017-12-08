package udea.test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import udea.test.modelo.Cliente;
import udea.test.modelo.Devolucion;
import udea.test.modelo.Venta;
import udea.test.rabbitconf.Publicador;

/**
 * Created by ELABCIUS on 05/12/2017.
 */
@RestController
public class Controller {

  @Autowired
  private Publicador publicador;

  @RequestMapping(method = RequestMethod.POST, value = "/cliente")
  public ResponseEntity<Cliente> crearCliente(@RequestBody Cliente cliente){
    publicador.publicarMensajeClienteAsnc("udea.clienteingresado", "clientes", cliente);
    return new ResponseEntity<>(HttpStatus.OK);
  }

  @RequestMapping(method = RequestMethod.POST, value = "/venta")
  public ResponseEntity<Venta> crearVenta(@RequestBody Venta venta){
    publicador.publicarMensajeVentaAsnc("udea.ventaingresada", "ventas", venta);
    return new ResponseEntity<>(HttpStatus.OK);
  }

  @RequestMapping(method = RequestMethod.POST, value = "/devolucion")
  public ResponseEntity<Devolucion> crearDevolucion(@RequestBody Devolucion devolucion){
    publicador.publicarMensajeDevolucionAsnc("udea.devolucioningresada", "devoluciones", devolucion);
    return new ResponseEntity<>(HttpStatus.OK);
  }
}
