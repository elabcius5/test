package udea.test.rabbitconf;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.stereotype.Component;
import udea.test.modelo.Cliente;
import udea.test.modelo.Devolucion;
import udea.test.modelo.Venta;

import java.util.concurrent.CompletableFuture;

/**
 * Created by David on 25/11/2017.
 */
@Component
public class Publicador {

  ApplicationContext cxt = new AnnotationConfigApplicationContext(RabbitConf.class);
  RabbitTemplate rbt = cxt.getBean(RabbitTemplate.class);

  public void publicarMensajeSnc(String exchange, String routingK, String mensaje){
    rbt.convertAndSend(exchange, routingK, mensaje);
  }

  public void publicarMensajeClienteAsnc(String exchange, String routingK, Cliente cliente){
    CompletableFuture.runAsync(()-> rbt.convertAndSend(exchange, routingK, cliente));
  }

  public void publicarMensajeVentaAsnc(String exchange, String routingK, Venta venta){
    CompletableFuture.runAsync(()-> rbt.convertAndSend(exchange, routingK, venta));
  }

  public void publicarMensajeDevolucionAsnc(String exchange, String routingK, Devolucion devolucion){
    CompletableFuture.runAsync(()-> rbt.convertAndSend(exchange, routingK, devolucion));
  }
}
